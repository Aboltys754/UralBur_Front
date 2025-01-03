import connector from "../libs/connector.js";

connector.add("Navigate");

function Navigate() {
  React.useEffect(() => {
    connector.del("Navigate");
    _animate(jQuery);
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand " href="index.html"><img src="images/logo.svg" alt="УралБурПроект" width="60px" height="60px" />УралБурПроект</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample05">
          <ul className="navbar-nav pl-md-5 ml-auto">
            <li className="nav-item">
              <a className={"nav-link" + _isActive("index.html")} href="index.html">Главная</a>
            </li>
            <li className="nav-item">
              <a className={"nav-link" + _isActive("about.html")} href="about.html">О компании</a>
            </li>
            <li className="nav-item">
              <a className={"nav-link" + _isActive("products.html")} href="products.html">Продукция</a>
            </li>
            <li className="nav-item dropdown">

              {/* эта ссылка должна быть активной сразу для нескольких страниц */}
              <a className={"nav-link dropdown-toggle" + _isActive(["foo.html", "bar.html"])}
                href="services.html" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Сервис</a>

              <div className="dropdown-menu" aria-labelledby="dropdown04">
                <a className="dropdown-item" href="index.html">Запчасти</a>
                <a className="dropdown-item" href="index.html">Индивидуальные решения</a>
                <a className="dropdown-item" href="index.html">Обслуживание</a>
              </div>
            </li>
            <li className="nav-item">
              <a className={"nav-link" + _isActive("contact.html")} href="contact.html">Контакты</a>
            </li>
          </ul>

          <div className="navbar-nav ml-auto">
            <form method="post" className="search-form">
              <span className="icon ion ion-search"></span>
              <input type="text" className="form-control" placeholder="Поиск..."></input>
            </form>
          </div>

        </div>
      </div>
    </nav>
  )
}

// принимает значение или массив значений
function _isActive(pageName) {
  const alias = window.location.pathname.split("/").pop() || 'index.html';

  if (Array.isArray(pageName)) {
    return pageName.indexOf(alias) !== -1 ? ' active' : '';
  }
  return pageName == alias ? ' active' : '';
}

function _animate($) {
  $('nav .dropdown').hover(function () {
    const $this = $(this);
    $this.addClass('show');
    $this.find('> a').attr('aria-expanded', true);
    $this.find('.dropdown-menu').addClass('show');
  }, function () {
    const $this = $(this);
    $this.removeClass('show');
    $this.find('> a').attr('aria-expanded', false);
    $this.find('.dropdown-menu').removeClass('show');
  });

  $('.navbar .dropdown > a').click(function () {
    location.href = this.href;
  });


  // $('#dropdown04').on('show.bs.dropdown', function () {
  //   console.log('show');
  // });
}

const root = ReactDOM.createRoot(document.getElementById("navigate"));
root.render(<Navigate />);
