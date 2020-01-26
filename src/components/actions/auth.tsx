import * as Google from 'expo-google-app-auth';

async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: ANDROID_ID,
      iosClientId: IOS_ID,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}
