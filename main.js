'use strict'

// 'https://youtube.googleapis.com/youtube/v3/search?q=bts&key=[YOUR_API_KEY]'

let videoList = [];

const getVideo = async () => {
  let url = new URL(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=bts&type=video&key=AIzaSyAe_Wyo2ZEfMacmxgMMAD8M8KXeedKji8U`);
  let data = await fetch(url).then((response)=> response.json());
  videoList = data.items;
  // console.log(videoList);
  render();
}
// getVideo();

const render = () => {
  let videoHTML = "";
  videoHTML = videoList.map((item) => {
    return `
    <div class="video">
    <a href="">
      <img
      src=${item.snippet.thumbnails.medium.url}
      alt=""
      />
    </a>
    <div class="video-detail">
      <a href="" class="avatar-link">
        <img
          src=${item.snippet.thumbnails.default.url}
          alt=""
          id="avatar-link-img"
        />
      </a>
      <div class="detail-description">
        <h3>
          <a href="">${item.snippet.title}</a>
        </h3>
        <div>
          <div>
            <a href="">${item.snippet.channelTitle}</a>
          </div>
          <div>
            <a href="">
              조회수, ${item.snippet.publishedAt}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  }).join('');

  document.querySelector(".video-board").innerHTML = videoHTML;
}
render();