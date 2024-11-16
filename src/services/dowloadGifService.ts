import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const handleDownloadAndOpenGif = (
  url: string,
  onComplete: (msg: string) => void,
  filename: string = 'gif',
) => {
  function getUrlExtension(url: string): string {
    return url.split(/[#?]/)[0].split('.').pop()!.trim();
  }

  const extension = getUrlExtension(url);
  console.log(extension);
  const localFile = `${RNFS.DownloadDirectoryPath}/${
    filename + '_' + Date.now().toString()
  }.${extension}`;

  const options = {
    fromUrl: url,
    toFile: localFile,
  };

  RNFS.downloadFile(options)
    .promise.then(() =>
      FileViewer.open(localFile, {
        showAppsSuggestions: true, // redirects to play store, if no relevant app is installed to open the file
        // showOpenWithDialog: true,    // lists all the relevant apps installed in the device to open the file
      }),
    )
    .then(() => {
      // success
      console.log(`file downloaded at ${localFile}`);
      onComplete('Gif downloaded!');
    })
    .catch(error => {
      // error
      console.log('download error', error);
      onComplete('Failed to download gif');
    });
};

export default handleDownloadAndOpenGif;
