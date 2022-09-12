'use strict'

// 'https://youtube.googleapis.com/youtube/v3/search?q=bts&key=[YOUR_API_KEY]'

const getVideo = async () => {
  let url = new URL(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=bts&type=video&key=AIzaSyAe_Wyo2ZEfMacmxgMMAD8M8KXeedKji8U`);
  let data = await fetch(url).then((response)=> response.json());
  console.log(data);
}
// getVideo();