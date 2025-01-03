import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";

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

fetch(`${serviceHost("mcontent")}/api/mcontent/slider/public/?isPublic=1`)
  .then(async response => {
    const res = await response.json();
    return res;
  })
  .then(res => {
    const root = ReactDOM.createRoot(document.getElementById("mainSlider"));
    root.render(<Slider slides={res} />);
  })
