import React from 'react';
import Breadcrumb from '~/components/commonSections/BreadCrumb';
import Button from '~/components/commonSections/Button';
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';

const DownloadEbook = ({ ebook }) => {
  if (!ebook) {
    return null;
  }

  const pdfUrl = ebook?.attachment?.asset?.url;

  //   const handleDownload = () => {
  //     if (!pdfUrl) return;

  //     const link = document.createElement('a');
  //     link.href = pdfUrl;
  //     link.setAttribute('download', 'ebook.pdf'); // Set the download attribute
  //     document.body.appendChild(link); // Append the link to the body
  //     link.click(); // Trigger the click event to start the download
  //     document.body.removeChild(link); // Remove the link after downloading
  //   };

  function download_file(fileURL, fileName) {

    let windowObj: any = typeof window !== "undefined" ? window : null;
    // for non-IE
    if (!windowObj.ActiveXObject) {
      var save = document.createElement('a');
      save.href = fileURL;
      save.target = '_blank';
      var filename = fileURL.substring(fileURL.lastIndexOf('/') + 1);
      save.download = fileName || filename;
      if (navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
        document.location = save.href;
        // window event not working here
      } else {
        var evt = new MouseEvent('click', {
          'view': windowObj,
          'bubbles': true,
          'cancelable': false
        });
        save.dispatchEvent(evt);
        (windowObj.URL || windowObj.webkitURL).revokeObjectURL(save.href);
      }
    }

    // for IE < 11
    else if (!!windowObj.ActiveXObject && document.execCommand) {
      var _window = windowObj.open(fileURL, '_blank');
      _window.document.close();
      _window.document.execCommand('SaveAs', true, fileName || fileURL)
      _window.close();
    }
  }

  return (
    <div className="p-6 rounded-lg mx-auto">
      <Breadcrumb />
      <div className='flex flex-col gap-12'>
        <div>
          <h2 className="text-3xl font-bold mb-4">{ebook?.title}</h2>
          <p className="text-lg mb-6">{ebook?.excerpt}</p>
          <div className="flex space-x-4">
            <Button link={pdfUrl} className='bg-cs-zinc-900' >
              <span className='text-base font-medium'>{` Read eBook`}</span>
            </Button>
            <Button className='bg-cs-zinc-900' onClick={() => { download_file(pdfUrl, `${ebook?.title}.pdf`) }}>
              <span className='text-base font-medium'>{`Download`}</span>
            </Button>
          </div>
        </div>
        {/* <BannerSubscribeSection isSmall={true}  /> */}
      </div>
    </div>
  );
};

export default DownloadEbook;
