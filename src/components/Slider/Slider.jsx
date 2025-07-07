import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";
import config from "../../components/config.js";

connector.add("Slider");

function Slider({ slides }) {
  React.useEffect(() => {
    _animate(jQuery);
    connector.del("Slider");
  })

  return slides.map((e) => <div key={e.id} className="slider-item" style={{ "backgroundImage": `url('${serviceHost("mcontent")}/api/mcontent/static/images/slider/${e.image.fileName}')` }}>
  <div className="container">
    <div className="row slider-text align-items-center justify-content-center">
      <div className="col-lg-7 text-center col-sm-12 element-animate">
        <h1 className="mb-4"><span>{e.title}</span></h1>
        <p className="mb-5 w-75">{e.message}</p>
      </div>
    </div>
  </div>
</div>)
}

function _animate($) {
  $('#mainSlider').owlCarousel({
    loop: true,
    autoplay: true,
    margin: 0,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: true,
    items: 1,
    dragTouch: false,
    navText: ["<span class='ion-chevron-left'></span>", "<span class='ion-chevron-right'></span>"],
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 1,
        nav: false
      },
      1000: {
        items: 1,
        nav: true
      }
    }
  });
}

// Разная логика для отрисовки компоненты с использование SSR в продакшене
// и без него в разработке.
// jQuery плагин owlCarousel меняет html код слайдера не лету,
// поэтому нельзя его отрендерить в Puppeteer и вставить в страницу.
// Для прода используется следующий подход: когда Puppeteer рендерит страницу
// и получает данные с бека, он сериализует их в строку и записывает её в data-content
// корневого div, при этом компоненту слайдера не рендерит.
// При отрисовке в браузере клиента, проверятся наличие этого data-content,
// после этого данные парсятся в json и передаются в компоненту для отрисовки
if(config.node === 'dev'){

  Promise.resolve()
  .then(_ => fetch(`${serviceHost("mcontent")}/api/mcontent/slider/public/?isPublic=1`))
  .then(async response => {
    const res = await response.json();
    return res;
  })
  .then(res => {
    const root = ReactDOM.createRoot(document.getElementById("mainSlider"));
    root.render(<Slider slides={res} />);
  })
  .catch(error => {
    if(error instanceof Error) console.log(error.message);
  });

} else { // prod

  Promise.resolve()
  .then(_ => {
    const slider = document.getElementById("mainSlider");

    if(slider.dataset.content) {
      const content = JSON.parse(slider.dataset.content);
      const root = ReactDOM.createRoot(document.getElementById("mainSlider"));
      root.render(<Slider slides={content} />);
      throw 1;
    }
  })
  .then(_ => fetch(`${serviceHost("mcontent")}/api/mcontent/slider/public/?isPublic=1`))
  .then(async response => {
    const res = await response.json();
    return res;
  })
  .then(res => {
    const slider = document.getElementById("mainSlider");
    slider.dataset.content = JSON.stringify(res);
    connector.del("Slider");
    // const root = ReactDOM.createRoot(document.getElementById("mainSlider"));
    // root.render(<Slider slides={res} />);
  })
  .catch(error => {
    if(error instanceof Error) console.log(error.message);
  });
}



