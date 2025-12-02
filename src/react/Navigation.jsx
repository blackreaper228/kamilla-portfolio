import React from "react";

const Navigation = () => {
  return (
    <>
      {/* Mobile Navigation */}
      <nav className="navMobile">
        <a href="/index.html">Kamilla</a>
        <div className="burgerIcon"></div>
      </nav>

      <ul className="burgerMenu">
        <div className="burgerItemWrap" id="photosBurgerDropDownBtn">
          <p>photos</p>
          <div className="burgerDropDown"></div>
        </div>
        <ul className="photosBurgerDropDown" id="photosBurgerDropDown">
          <li>
            <a href="/pages/photos/e-commerce.html">e-commerce</a>
          </li>
          <li>
            <a href="/pages/photos/events.html">events</a>
          </li>
          <li>
            <a href="/pages/photos/fashion.html">fashion</a>
          </li>
          <li>
            <a href="/pages/photos/interior.html">interior</a>
          </li>
          <li>
            <a href="/pages/photos/magazine.html">magazine cover</a>
          </li>
          <li>
            <a href="/pages/photos/personal.html">personal</a>
          </li>
          <li>
            <a href="/pages/photos/product.html">product</a>
          </li>
          <li>
            <a href="/pages/photos/bts.html">bts</a>
          </li>
        </ul>

        <li>
          <a href="/pages/videos/videos.html">videos</a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/ekmv.ph?igsh=M3ppMDl0bmxsaXR4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </li>
        <li className="burgerContact">
          <a
            href="https://t.me/kami_tt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact <span>↗</span>
          </a>
        </li>
      </ul>

      {/* Background Navigation */}
      <nav className="navBG">
        <ul>
          <div className="navContainer">
            <div className="leftNav">
              <li>
                <a href="/index.html">Kamilla</a>
              </li>
              <div className="dropDownPhotos">
                <li style={{ opacity: 0, pointerEvents: "none" }}>
                  <a>Photos</a>
                </li>
              </div>
              <li style={{ opacity: 0, pointerEvents: "none" }}>
                <a href="/pages/videos/videos.html">Videos</a>
              </li>
            </div>
            <div className="midNav">
              <li>
                <a
                  href="https://www.instagram.com/ekmv.ph?igsh=M3ppMDl0bmxsaXR4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </div>
          </div>
          <li className="contact">
            <a
              href="https://t.me/kami_tt"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact <span className="arrowLink">↗</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Navigation */}
      <nav>
        <ul>
          <div className="navContainer">
            <div className="leftNav">
              <li>
                <a href="/index.html">Kamilla</a>
              </li>
              <div className="dropDownPhotos" id="dropDownPhotosID">
                <li style={{ opacity: 1, pointerEvents: "auto" }}>
                  <a>Photos</a>
                </li>
              </div>
              <li style={{ opacity: 1, pointerEvents: "auto" }}>
                <a href="/pages/videos/videos.html">Videos</a>
              </li>
            </div>
            <div className="midNav">
              <li>
                <a
                  href="https://www.instagram.com/ekmv.ph?igsh=M3ppMDl0bmxsaXR4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </div>
          </div>
          <li className="contact">
            <a
              href="https://t.me/kami_tt"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact <span className="arrowLink">↗</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Transparent Navigation with Dropdowns */}
      <nav className="navTransparent">
        <ul>
          <div className="navContainer">
            <div className="leftNav">
              <li>
                <a href="/index.html">Kamilla</a>
              </li>
              <div className="dropDownPhotos" id="dropDownPhotosActive">
                <li style={{ opacity: 0, pointerEvents: "none" }}>
                  <a>Photos</a>
                </li>
                <ul style={{ pointerEvents: "auto" }}>
                  <li>
                    <a href="/pages/photos/e-commerce.html">e-commerce</a>
                  </li>
                  <li>
                    <a href="/pages/photos/events.html">events</a>
                  </li>
                  <li>
                    <a href="/pages/photos/fashion.html">fashion</a>
                  </li>
                  <li>
                    <a href="/pages/photos/interior.html">interior</a>
                  </li>
                  <li>
                    <a href="/pages/photos/magazine.html">magazine cover</a>
                  </li>
                  <li>
                    <a href="/pages/photos/personal.html">personal</a>
                  </li>
                  <li>
                    <a href="/pages/photos/product.html">product</a>
                  </li>
                  <li>
                    <a href="/pages/photos/bts.html">bts</a>
                  </li>
                </ul>
              </div>
              <li style={{ opacity: 0, pointerEvents: "none" }}>
                <a href="/pages/videos/videos.html">Videos</a>
              </li>
            </div>
            <div className="midNav">
              <li>
                <a
                  href="https://www.instagram.com/ekmv.ph?igsh=M3ppMDl0bmxsaXR4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </div>
          </div>
          <li className="contact">
            <a
              href="https://t.me/kami_tt"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact <span className="arrowLink">↗</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
