import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";
import config from "../../components/config.js";

connector.add("Testimonial");

function Testimonial({ testimonials }) {
  React.useEffect(() => {
    _animate(jQuery);
    connector.del("Testimonial");
  });

  return <div className="container">
    <div className="row justify-content-center mb-5">
      <div className="col-md-8 text-center">
        <h2 className=" heading mb-4">Отзывы</h2>
      </div>
    </div>
    <div className="nonloop-block-11 owl-carousel" id="testimonialSliderCarousel">
      <Items testimonials={testimonials} />
    </div>
  </div>
}

function Items({ testimonials }) {
  return testimonials.map((e) => <div key={e.id} className="item">
    <div className="block-33 h-100">
      <div className="vcard d-flex mb-3">
        <div className="image align-self-center"><img src={`${serviceHost("mcontent")}/api/mcontent/static/images/testimonial/${e.photo.fileName}`} alt={e.name} /></div>
        <div className="name-text align-self-center">
          <h2 className="heading">{e.name}</h2>
          <span className="meta">{e.company}</span>
        </div>
      </div>
      <div className="text">
        <blockquote>
          <p>&rdquo; {e.message} &ldquo;</p>
        </blockquote>
      </div>
    </div>
  </div>)
}

function _animate($) {
  $('#testimonialSliderCarousel').owlCarousel({
    center: false,
    items: 1,
    loop: false,
    stagePadding: 20,
    margin: 50,
    nav: true,
    smartSpeed: 1000,
    navText: ['<span class="ion-chevron-left">', '<span class="ion-chevron-right">'],
    responsive: {
      600: {
        stagePadding: 20,
        items: 1
      },
      800: {
        stagePadding: 20,
        items: 1
      },
      1000: {
        // stagePadding: 200,
        items: 1
      }
    }
  })
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
  .then(_ => fetch(`${serviceHost("mcontent")}/api/mcontent/testimonial/public/?isPublic=1`))
  .then(async response => {
    const res = await response.json();
    return res;
  })
  .then(res => {
    const root = ReactDOM.createRoot(document.getElementById("testimonialSlider"));
    root.render(<Testimonial testimonials={res} />);
  })
  .catch(error => {
    if (error instanceof Error) console.log(error.message);
  });
  
} else { // prod

  Promise.resolve()
  .then(_ => {
    const slider = document.getElementById("testimonialSlider");

    if(slider.dataset.content) {
      const content = JSON.parse(slider.dataset.content);
      const root = ReactDOM.createRoot(document.getElementById("testimonialSlider"));
      root.render(<Testimonial testimonials={content} />);
      throw 1;
    }
  })
  .then(_ => fetch(`${serviceHost("mcontent")}/api/mcontent/testimonial/public/?isPublic=1`))
  .then(async response => {
    const res = await response.json();
    return res;
  })
  .then(res => {
    const slider = document.getElementById("testimonialSlider");
    slider.dataset.content = JSON.stringify(res);
    connector.del("Testimonial");
    // const root = ReactDOM.createRoot(document.getElementById("testimonialSlider"));
    // root.render(<Testimonial testimonials={res} />);
  })
  .catch(error => {
    if (error instanceof Error) console.log(error.message);
  });
}

