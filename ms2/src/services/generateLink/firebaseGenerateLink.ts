import axios from 'axios';

interface IGenerateLink {
  generateDynamicLink(url: string): Promise<string>;
}

async function generateDynamicLink(url: string): Promise<string> {
  try {
    const response = await axios.post(
      `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.FIREBASE_API_KEY}`,
      {
        longDynamicLink: `https://revealapp.page.link/?link=${url}&apn=com.reveal.reveal&ibi=com.example.ios`,
      },
    );

    return response.data.shortLink;
  } catch (err: any) {
    throw new Error(`Error generating dynamic link: ${err.message}`);
  }
}

export { generateDynamicLink, IGenerateLink };
