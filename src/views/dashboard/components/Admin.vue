<style lang="scss" scoped>
@font-face {
  font-family: 'TheJamsil300';
  font-weight: 300;
  font-style: normal;
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/TheJamsil/TheJamsil-Light.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/TheJamsil/TheJamsil-Light.eot?#iefix') format('embedded-opentype'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/TheJamsil/TheJamsil-Light.woff2') format('woff2'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/TheJamsil/TheJamsil-Light.woff') format('woff'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/TheJamsil/TheJamsil-Light.ttf') format("truetype");
  font-display: swap;
}

@font-face {
  font-family: 'TheJamsil400';
  font-weight: 400;
  font-style: normal;
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/TheJamsil/TheJamsil-Regular.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/TheJamsil/TheJamsil-Regular.eot?#iefix') format('embedded-opentype'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/TheJamsil/TheJamsil-Regular.woff2') format('woff2'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/TheJamsil/TheJamsil-Regular.woff') format('woff'),
  url('https://cdn.jsdelivr.net/gh/webfontworld/TheJamsil/TheJamsil-Regular.ttf') format("truetype");
  font-display: swap;
}

.TheJamsil300 {
  font-family: 'TheJamsil300', sans-serif;
}

.TheJamsil400 {
  font-family: 'TheJamsil400', sans-serif;
}

body {
  font-family: 'TheJamsil300', sans-serif;
}

.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#hero {
  background-image: url('../../../assets/img/어두운 배경.png'); /* 이미지 파일 경로를 설정하세요 */
  background-size: cover; /* 배경 이미지를 섹션에 맞게 확대/축소 */
  background-position: center; /* 배경 이미지를 가운데 정렬 */
  color: white; /* 텍스트 색상을 설정하세요 (배경 이미지에 대한 대비를 높이기 위해) */
  text-align: center; /* 텍스트를 가운데 정렬 */
  padding: 0.2vw; /* 내용과의 간격을 설정하세요 */
}
</style>
<template>
  <main id="main" class="main">
    <div class="row">
      <div class="col-lg-12" style="margin-bottom: 1vw;">
        <!-- ======= Hero Section ======= -->
        <section id="hero" class="hero d-flex align-items-center section-bg">
          <div class="container">
            <div class="row justify-content-between gy-5">
              <div
                class="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
                <h1 data-aos="fade-up" class="TheJamsil400" style="white-space: nowrap; margin: 1vw;">간편하게 이용하는 식단관리
                  솔루션,<br>Chat PT</h1>
                <p data-aos="fade-up" data-aos-delay="100" class="TheJamsil300" style="margin: 1vw;">
                  건강한 식단을 찾고 계신 당신에게
                  <br>
                  맞춤 식단 전문가가 되어 드립니다.
                </p>
                <div class="d-flex" data-aos="fade-up" data-aos-delay="200">
                  <a href="#book-a-table" class="" style="margin: 1vw;">자세히 알아보기</a>
                </div>
              </div>
            </div>
          </div>
        </section><!-- End Hero Section -->
      </div>
    </div>
    <section class="section dashboard" style="padding:0 2vw;">
      <div class="row">

        <!-- Left side columns -->
        <div class="col-lg-8">
          <div class="row">

            <!-- 사진 등록 -->
            <div class="col-12">
              <div class="container-xl" style="min-height: 300px; padding: 2vw;">
                <h1 class="TheJamsil400">오늘의 식단을 업로드 해주세요!</h1>
                <p class="TheJamsil300" style="font-size: 1em;">사진을 전부 등록 해주시면 저희가 분류해드릴게요.</p>
                <button class="btn btn-warning">사진 업로드</button>
              </div>
            </div><!-- 사진 등록 -->

          </div>
        </div><!-- End Left side columns -->

        <!-- Right side columns -->
        <div class="col-lg-4">
          <div class="col-12">
            <!-- 오늘의 칼로리 -->
            <div class="card">

              <div class="card-body pb-0">
                <h5 class="card-title TheJamsil300">오늘의 칼로리</h5>

                <div id="trafficChart" style="min-height: 400px; width: 100%;" class="echart"></div>

              </div>
            </div><!-- 오늘의 칼로리 -->
          </div>
        </div><!-- End Right side columns -->

      </div>
    </section>

  </main><!-- End #main -->

</template>
<!-- ECharts Library -->
<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    // 'echarts' 변수가 'mounted' 훅 안에서 사용되므로 이곳에서 초기화
    echarts.init(document.querySelector("#trafficChart")).setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [{
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [{
          value: 1048,
          name: '점심'
        },
          {
            value: 435,
            name: '아침'
          },
          {
            value: 0,
            name: '저녁'
          },
          {
            value: 120,
            name: '간식'
          },
          {
            value: 930,
            name: '남은 칼로리',
            itemStyle: {
              color: 'grey' // '남은 칼로리'를 회색으로 지정
            }
          }
        ]
      }]
    });
  }
};
</script>
