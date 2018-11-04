module.exports = {
  imprint: [
    {
      heading: 'The MIT License',
      body:
        'Copyright (c) 2018 Robert Wolff. Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.'
    },
    {
      body:
        'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'
    },
    {
      body:
        'This app is fan-made and not affiliated with Grinding Gear Games in any way. For more information, visit https://github.com/rowolff/babel-poe'
    },
    {
      heading: 'Frequently Asked Questions',
      subheading:
        'Does using this app break the Terms and Conditions of Path of Exile?',
      body:
        'No. The app only periodically reads from the Client.txt file in the logs folder and checks for incoming whispers. The whispers are then processed entirely within this app. No modifications are made to the Path of Exile client, its data in memory, or to the network calls between the Path of Exile client and servers.'
    },
    {
      subheading: 'Why is the translation so strange sometimes?',
      body:
        "The app doesn't translate the text itself, it uses Google Translate to automatically detect the input language and to translate your reply. The quality of the translation is just as you would expect from Google Translate. Google Translate can sometimes not get the context right and is not aware of in-game terminology."
    },
    {
      subheading: "The app doesn't work/crashes",
      body:
        'Please create an issue with a description of the bug/crash on https://github.com/rowolff/babel-poe/issues - I will try to fix it for the next updates.'
    },
    {
      subheading: 'This app looks bad/works quirky/the code s**ks',
      body:
        "This is a hobby project which helps me learning how to program. I know it's not perfect - if you have a suggestion, please create an issue on https://github.com/rowolff/babel-poe/issues or if you are a programmer yourself and want to contribute, consider opening a Pull Request."
    },
    {
      heading: 'Privacy Policy',
      subheading: 'Google Analytics',
      body:
        'This App uses Google Analytics, the analytics service of Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. There is currently no mechanism to deactivate Google Analytics in this app. If you do not want data to be sent to Google Analytics, please do not use the app until an opt-out is available.'
    },
    {
      subheading: 'What data is being sent to Google Analytics?',
      body:
        'The app collects event and crash data only. No personal identifiable data is collected locally, nor sent to Google. Event data contains: number of app starts, number of translations (without any text - just a count). Crash data contains: where the crash occured, what the error message was.'
    },
    {
      subheading: 'How is data being transmitted to Google Analytics?',
      body:
        'The app uses the anonymized method to mask your IP address. This way, the data owner cannot track your location, but can still know in which country/regions the app is used. Google Analytics uses Cookies. These are small text files which enable to store usage data on the device the app is running. The data collected in cookies (including the masked IP-address) are usually transmitted to a server in the USA, which is owned by Google. Google complies to the privacy policy of the „US-Safe-Harbor Agreement“ and is registered with the „Safe Harbor“ program of the US ministry of trade. Google uses the collected information to analyze the usage of apps and websites, to create reports for these and to provide other, related services. More information is availabe at https://policies.google.com/privacy'
    },
    {
      subheading:
        'What do you do with the collected data transmitted to Google Analytics?',
      body:
        'I collect information how frequently the app is being used in which regions and how often and where errors/crashes occur. I do that to be able to improve the app continuously.'
    }
  ]
}
