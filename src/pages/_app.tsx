import '~/styles/global.scss'
import type { AppProps } from 'next/app'
import { lazy } from 'react'
import Head from 'next/head'
import { orgSchema, siteLinkSchema } from '~/utils/customHead'
import { usePathname } from 'next/navigation'
import { cookieSelector, slugToCapitalized } from '~/utils/common'
import { createObservedUser, createSession, createUser, getUserData, TrackUserProvider } from '~/utils/tracker/intitialize'
import track, { getDeviceData } from 'cs-tracker'
import { getCookie, checkCookie, eraseCookie } from '~/utils/tracker/cookie'
import { addEvent } from '~/utils/tracker/events'
import { getSession } from '~/utils/tracker/session'
import { getUser } from '~/utils/tracker/user'

export interface SharedPageProps {
  draftMode?: boolean
  token?: string
  locale?: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))


 function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  const pathname:any = usePathname()
  const currentWindow =pathname && pathname?.split('/') || []
  const index = pathname?.split('/').length-1 || 0
  const result = slugToCapitalized(currentWindow[index])

  return (
    <>
    <TrackUserProvider>
      <Head>
        <link
          rel="icon"
          href="/favicon-32x32.ico"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-16x16.ico"
          sizes="16x16"
          type="image/png"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      {orgSchema()}
      {siteLinkSchema()}
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
      </TrackUserProvider>
    </>
  )
}

let trackData: any[] = [];
let isSending = false;
const TrackWrapper = track(
  { app: "carestack", },
  {
    dispatch: dispatchEvent
  },
  // }
)(App);

export default TrackWrapper;


function dispatchEvent(data: any) {      
  const cookieAnalytics = cookieSelector(getCookie('cookieyes-consent'),'analytics')
  const countryVersion:any = getCookie("__cs_ver"); 
  const pageVersion:any = getCookie("__cs_pc");       
                
  if((cookieAnalytics && cookieAnalytics !== "yes") && countryVersion == 2 && !(pageVersion === "ph-c")){
    console.log("returned from tracker in app.tsx");
    return
  }

  if (checkCookie()) {
    // const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";
    // if (isProduction) {
    const temp = { ...data };
    delete temp.internalData; // deleting because it is using for internal purpose only.
    trackData.push(temp);
    const domain = window.location.origin;
    // if (window !== undefined && trackData.length > 0 && !isSending) {
    if (window !== undefined && trackData.length > 0 && !isSending && domain === "https://resources.carestack.com") {
      const user = getUser()
      if (user) {

        if (!data.internalData.observedUser) {
          getUserData(user).then(res => {
            if (res) {
              const observedUser = createObservedUser(res)
              data.internalData.setObservedUser(observedUser)
            }
          })
        }
        data.internalData.setUserId(getUser())
        isSending = true
        const session = getSession()
        // If session is not present create
        if (!session) {

          createSession().then(res => {

            if (res) {
              data.internalData.setSessionId(res.sessionId)
              trackData.forEach(item => {
                item.session_id = res?.sessionId;
              })
            }
            setTimeout(() => {
              addEvent(trackData).then((res) => {
                if (res.msg === "success") {
                  trackData = [];
                }
              }).finally(() => { isSending = false });
            }, 1000);
          }).catch(err => {
            console.log(err);

            if (err?.error === "user_key_invalid") {
              eraseCookie('__cs_pv');
              eraseCookie('session');
              isSending = false;
              trackData = [];
              dispatchEvent(data);
            }
          })
        } else {
          setTimeout(() => {
            addEvent(trackData).then((res) => {
              /**
               *  If there is any error occur on session_id or user_id;
               *  or deleted from the database for some reason, we need to create
               * new user. 
               * 
               * the flow will be like this:
               *  posts data -> errored from api (must have response <session|user>_key_invalid)
               *  -> delete cookie of user and session ( if error is in user_id, session_id cookie should be deleted as well.)
               * -> resetting all the settings for dispatchEvent -> recurse dispatchEvent.
               */
              if (res.error) {
                if (res.error === "session_key_invalid") {
                  eraseCookie('session');
                  isSending = false;
                  trackData = [];
                  dispatchEvent(data);
                }
                if (res.error === "user_key_invalid") {
                  eraseCookie('__cs_pv');
                  eraseCookie('session');
                  isSending = false;
                  trackData = [];
                  dispatchEvent(data);
                }
              }
              if (res.msg === "success") {
                trackData = [];
              }
            }).finally(() => {
              isSending = false
            });
          }, 1000);
        }
      } else {
        trackData = []; // emptying the current data for not duplicating from what we already have, (It should only have one data which occur on firs event)
        getDeviceData().then(res => {
          createUser(res).then(res => {
            if (res) {
              const observedUser = createObservedUser(res);
              data.internalData.setObservedUser(observedUser)
              data.internalData.setUserId(res.id);
              dispatchEvent(data);
            }
          })
        })
      }
    }
  }
}