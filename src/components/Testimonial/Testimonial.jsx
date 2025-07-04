import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";

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

Promise.resolve()
  .then(_ => {
    // if (document.getElementById("testimonialSlider").innerHTML) {
    //   connector.del("Testimonial");
    //   jQuery(window).on('load', function() {
    //     _animate(jQuery);
    //   });
    //   throw 1;
    // } 
  })
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
