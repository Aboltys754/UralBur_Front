import serviceHost from "../libs/service.host.js";

function Testimonial({ testimonials }) {
  React.useEffect(() => _animate(jQuery))

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
  $('#testimonialSlider').owlCarousel({
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

fetch(`${serviceHost("mcontent")}/api/mcontent/testimonial/public/?isPublic=1`)
  .then(async response => {
    const res = await response.json();
    return res;
  })
  .then(res => {
    const root = ReactDOM.createRoot(document.getElementById("testimonialSlider"));
    root.render(<Testimonial testimonials={res} />);
  })
