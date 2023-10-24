import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';

export function getCurrentDate(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = date.getFullYear();

    return year + '-' + month + '-' + day;
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
}

export async function urlOpener(url: string, redirectUrl: string): Promise<void> {
    await InAppBrowser.isAvailable();
    const authSessionResult = await InAppBrowser.openAuth(url, redirectUrl, {
      showTitle: false,
      enableUrlBarHiding: true,
      enableDefaultShare: false,
      ephemeralWebSession: false,
    });
  
    if (authSessionResult.type === 'success') {
      Linking.openURL(authSessionResult.url);
    }
  }
  
