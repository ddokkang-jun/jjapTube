'use strict'

// 'https://youtube.googleapis.com/youtube/v3/search?q=bts&key=[YOUR_API_KEY]'
// https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=8&type=video&key=AIzaSyAe_Wyo2ZEfMacmxgMMAD8M8KXeedKji8U
// 'https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&key=[YOUR_API_KEY]'

let searchInput = document.querySelector(".search-input");
let videoList = [];

const getSearchVideo = async (value) => {
  let url = new URL(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${value}&type=video&key=AIzaSyAe_Wyo2ZEfMacmxgMMAD8M8KXeedKji8U`);
  let data = await fetch(url).then((response) => response.json());
  videoList = data.items;
  render();
}

// 마우스로 검색버튼을 클릭하면 검색하기
let searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener('click', () => {
  let searchInputValue = searchInput.value;
    if(searchInputValue == '' ){
      return;
    }else {
      getSearchVideo(searchInputValue);
      searchInput.value = "";
    }
  
})
// 키보드로 엔터를 누르면 검색을 해주는 기능 구현하기
searchInput.addEventListener('keypress', (e) => {
  if(e.key == "Enter"){
    let searchInputValue = searchInput.value;
    if(searchInputValue == '' ){
      return;
    }else {
      getSearchVideo(searchInputValue);
      searchInput.value = "";
    }
  }else {
    return;
  }
})

// 현재 인기있는 채널 8개를 메뉴화면에 버튼으로 보여주기
const mainMenu = async () => {
  let list = [];
  let buttonHTML = '';
  let url = new URL(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=8&type=video&key=AIzaSyAe_Wyo2ZEfMacmxgMMAD8M8KXeedKji8U`);
  let data = await fetch(url).then((response)=> response.json());
  list = data.items;
  
  buttonHTML = list.map((item) => {
    return `
      <button>${item.snippet.channelTitle}</button>
    `;
  }).join('');

  document.querySelector(".menu-buttons").innerHTML = buttonHTML;

  // 메뉴바에 메뉴 클릭하면 해당된 메뉴로 검색해주기
  let menuBtn = document.querySelectorAll(".menu-buttons button");
  menuBtn.forEach((item) => item.addEventListener('click', (e) => {
    let targetValue = e.target.innerHTML;
    getSearchVideo(targetValue);
  }));
}
mainMenu();

// 맨처음 디폴트 화면
const getVideo = async () => {
  let url = new URL(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=8&type=video&key=AIzaSyAe_Wyo2ZEfMacmxgMMAD8M8KXeedKji8U`);
  let data = await fetch(url).then((response)=> response.json());
  videoList = data.items;
  mainMenu(videoList);
  render();
}
getVideo();

// 메인 렌더 함수
const render = () => {
  let videoHTML = "";
  videoHTML = videoList.map((item) => {
    return `
    <div class="video">
    <a href="https://www.youtube.com/watch?v=${item.id.videoId}">
      <img
      src=${item.snippet.thumbnails.medium.url}
      alt=""
      />
    </a>
    <div class="video-detail">
      <a href="https://www.youtube.com/channel/${item.snippet.channelId}" class="avatar-link">
        <img
          src=${item.snippet.thumbnails.default.url}
          alt=""
          id="avatar-link-img"
        />
      </a>
      <div class="detail-description">
        <h3>
          <a href="https://www.youtube.com/watch?v=${item.id.videoId}">${item.snippet.title.length > 50 ? item.snippet.title.substring(0, 50) + "..."
          : item.snippet.title}</a>
        </h3>
        <div>
          <div>
            <a href="https://www.youtube.com/watch?v=${item.id.videoId}" class="channelTitle">${item.snippet.channelTitle}</a>
          </div>
          <div>
            <a href="https://www.youtube.com/watch?v=${item.id.videoId}" class="publishedAt">
              ${moment(item.snippet.publishedAt).fromNow()}
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






