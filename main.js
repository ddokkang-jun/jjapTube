'use strict'

// 'https://youtube.googleapis.com/youtube/v3/search?q=bts&key=[YOUR_API_KEY]'
// https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=8&type=video&key=AIzaSyAe_Wyo2ZEfMacmxgMMAD8M8KXeedKji8U

let searchInput = document.querySelector(".search-input");
let youtubeLogo = document.querySelector(".logo");
let videoList = [];

// 메인 렌더 함수
const render = () => {
  let videoHTML = "";
  
  videoHTML = videoList.map((item) => {
    let id = item.id.videoId;
    if(id == undefined){
      id = item.id;
    }else {
      id = item.id.videoId;
    }
    return `
      <div class="video">
        <div class="video-img-box">
          <a href="https://www.youtube.com/watch?v=${id}" target="_blank">
            <div class="video-img">
              <img src="${item.snippet.thumbnails.medium.url}" alt=""/>
            </div>
            <div class="video-img-text">
              <p>클릭하여 해당영상으로 이동</p>
            </div>
          </a>
        </div>
        <div class="video-detail">
          <a href="https://www.youtube.com/channel/${item.snippet.channelId}" class="avatar-link" target="_blank">
            <img
              src=${item.snippet.thumbnails.default.url}
              alt=""
              id="avatar-link-img"
            />
          </a>
          <div class="detail-description">
            <h3>
              <a href="https://www.youtube.com/watch?v=${id}" target="_blank">${item.snippet.title.length > 50 ? item.snippet.title.substring(0, 50) + "..."
              : item.snippet.title}</a>
            </h3>
            <div>
            <div>
              <a href="https://www.youtube.com/watch?v=${id}" class="channelTitle" target="_blank">${item.snippet.channelTitle}</a>
            </div>
            <div>
              <a href="https://www.youtube.com/watch?v=${id}" class="publishedAt" target="_blank">
                ${moment(item.snippet.publishedAt).fromNow()}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  }).join('');

  document.querySelector(".videos").innerHTML = videoHTML;
}
render();

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

// 메뉴바에 메뉴버튼을 클릭하면 해당된 메뉴를 검색어로 검색하기
let menuBtn = document.querySelectorAll(".menu-buttons button");
menuBtn.forEach((item) => item.addEventListener('click', (e) => {
  let targetValue = e.target.innerHTML;
  getSearchVideo(targetValue);
}));

// 맨처음 디폴트 화면에는 MostPopularVideo 영상들을 나열해줌
const getMostPopularVideo = async () => {
  let url = new URL(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=8&type=video&key=AIzaSyAe_Wyo2ZEfMacmxgMMAD8M8KXeedKji8U`);
  let data = await fetch(url).then((response)=> response.json());
  videoList = data.items;
  
  render();
}
getMostPopularVideo();

// 유튜브 로고를 클릭하면 맨처음 디폴트 영상들을 다시 보여주기
youtubeLogo.addEventListener('click', () => {
  getMostPopularVideo();
})





