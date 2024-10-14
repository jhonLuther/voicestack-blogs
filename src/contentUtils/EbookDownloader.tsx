import React from 'react';

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

    let windowObj :any = typeof window !== "undefined" ? window : null;
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
      <h2 className="text-3xl font-bold mb-4">{ebook?.title}</h2>
      <p className="text-lg mb-6">{ebook?.excerpt}</p>
      <div className="flex space-x-4">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-300 no-underline text-green-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-500 transition-all ease-out duration-300"
        >
          Read eBook
        </a>
        <button
          onClick={() => { download_file(pdfUrl, `${ebook?.title}.pdf`) }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-all ease-out duration-300"
        >
          Download eBook
        </button>
      </div>
    </div>
  );
};

export default DownloadEbook;
