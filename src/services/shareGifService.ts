import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export async function shareGif(
  gifUrl: string,
  onComplete: (msg?: string) => void,
) {
  try {
    const filePath = `${RNFS.CachesDirectoryPath}/${Date.now().toString()}.gif`;
    RNFS.downloadFile({
      fromUrl: gifUrl,
      toFile: filePath,
    })
      .promise.then(() => {
        Share.open({
          title: 'Share GIF',
          message: 'Check out this GIF!',
          url: `file://${filePath}`,
        })
          .then(() => {
            onComplete();
          })
          .catch(() => {
            onComplete();
          });
      })
      .catch(err => {
        console.log('error in downloading gif', err);
      });
  } catch (error) {
    console.error('Error downloading or sharing the GIF:', error);
    onComplete('Failed to share gif');
  }
}
