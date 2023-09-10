import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Iframe from "react-iframe";
import LogoGreetDay from "../../assets/images/gd.png";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <Container>
        <Row className="main-foot">
          <Col className="col col-lg-4 col-md-12 col-12">
            <img
              className="text-lg-start text-md-center text-center mb-lg-0 mb-md-5 mb-2 main-title"
              src={LogoGreetDay}
              alt="logo"
            />
          </Col>

          <Col className="col col-lg-2 col-md-3 col-12">
            <ul>
              <li className="list-unstyled">
                <h5 className="mt-lg-0 mt-md-0 mt-4 mb-3">About Us</h5>
              </li>
              <li className="list-unstyled mb-2">
                <a href="#0">Career</a>
              </li>
              <li className="list-unstyled mb-2">
                <a href="#0">Register</a>
              </li>
              <li className="list-unstyled mb-2">
                <a href="#0">Privacy</a>
              </li>
            </ul>
          </Col>

          <Col className="col col-lg-2 col-md-3 col-12">
            <ul>
              <li className="list-unstyled">
                <h5 className="mt-lg-0 mt-md-0 mt-4 mb-3">Features</h5>
              </li>
              <li className="list-unstyled mb-2">
                <a href="#0">
                  <i className="bi bi-instagram"></i>Business Insights
                </a>
              </li>
              <li className="list-unstyled mb-2">
                <a href="#0">
                  <i className="bi bi-twitter"></i>Application
                </a>
              </li>
              <li className="list-unstyled mb-2">
                <a href="#0">
                  <i className="bi bi-facebook"></i>Transaction
                </a>
              </li>
            </ul>
          </Col>

          {/* -------------------------------CONTACT---------------------------------- */}
          <Col className="col col-lg-3 col-md-6 col-12">
            <ul>
              <li className="list-unstyled">
                <h5 className="mt-lg-0 mt-md-0 mt-4 mb-3">Contact</h5>
              </li>
              <li className="list-unstyled mb-2">
                <a href="#0">
                  <i className="bi bi-geo-alt-fill"></i>Bintaro 502 Nissi
                  Bintaro Campus, Lantai 5, Jl. Tegal Rotan Raya No.78,
                  Kelurahan Sawah Baru, Kecamatan Ciputat, Kota Tangerang
                  Selatan, Banten 15413.
                </a>
              </li>
              <li className="list-unstyled mb-2">
                <a href="#0">
                  <i className="bi bi-telephone-fill"></i>(+62)-8139-5030
                </a>
              </li>
              <li className="list-unstyled mb-2">
                <a href="#0">
                  <i className="bi bi-envelope-at-fill"></i>
                  recruitment@greatdayhr.com
                </a>
              </li>
              <li className="list-unstyled">
                <div className="map mt-4">
                  <Iframe
                    className="rounded-3"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8468857140892!2d106.72287600964613!3d-6.283849361480083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f00af04427bd%3A0x143c0638da2f24ed!2sNISSI%20BINTARO%20CAMPUS!5e0!3m2!1sid!2sid!4v1694279825210!5m2!1sid!2sid"
                    allowfullscreen=""
                    loading="lazy"
                  ></Iframe>
                </div>
              </li>
            </ul>
          </Col>
        </Row>

        {/* -------------------------------COPYRIGHT---------------------------------- */}
        <Row className="justify-content-lg-between justify-content-md-center justify-content-center mt-5 bott-foot">
          <Col className="col-lg-4 col-md-12 col-12 text-lg-start text-md-center text-center">
            <p className="copy">Copyright 2022. All rights reserved</p>
          </Col>
          <Col className="col-lg-4 col-md-12 col-12 text-lg-end text-md-center text-center">
            <p className="design">Designed by Naufal</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
