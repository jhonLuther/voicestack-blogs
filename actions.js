import { useState, useEffect } from 'react'
import { useDocumentOperation } from 'sanity'

export function SetAndPublishAction(props) {
  const { patch, publish } = useDocumentOperation(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    // Reset the publishing state once the draft becomes `null` (published)
    if (isPublishing && !props.draft) {
      setIsPublishing(false)
    }
  }, [props.draft, isPublishing])

  // Ensure the disabled property is strictly boolean
  const isDisabled = publish.disabled === false ? false : true

  // Determine the label based on the document type
  const label = isPublishing
    ? 'Publishing…'
    : props.type === 'tag'
      ? 'Save'
      : 'Publish & Update'

  return {
    disabled: isDisabled, // Ensure this is always boolean
    label,
    onHandle: () => {
      // Update the button text and set isPublishing to true
      setIsPublishing(true)

      // Optional: Patch the document to set any specific fields (e.g., publishedAt)
      // patch.execute([{ set: { publishedAt: new Date().toISOString() }}]);

      // Perform the publish operation
      publish.execute()

      // Signal that the action is complete
      props.onComplete()
    },
  }
}
