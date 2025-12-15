const footerHTML = `
<footer class="footer">
  <div class="container">
    <div class="footer__content grid grid--3">
      <!-- Footer Col 1 -->
      <div class="footer__col">
        <h4 data-i18n="footer.about">درباره پروژه</h4>
        <p data-i18n="footer.aboutDesc">
          پلتفرم آموزشی BFO، پروژه درس هوش مصنوعی تحت نظارت دکتر رویا نمیرانیان
        </p>
        <p class="footer__credit" data-i18n="footer.implementation">پیاده‌سازی: جمال سام‌خانیان</p>
      </div>

      <!-- Footer Col 2 -->
      <div class="footer__col">
        <h4 data-i18n="footer.sections">بخش‌های پلتفرم</h4>
        <ul>
          <li><a href="education.html" data-i18n="footer.education">بخش آموزش</a></li>
          <li><a href="laboratory.html" data-i18n="footer.laboratory">بخش آزمایشگاه</a></li>
          <li><a href="about.html" data-i18n="nav.about">درباره</a></li>
        </ul>
      </div>

      <!-- Footer Col 3 -->
      <div class="footer__col">
        <h4 data-i18n="footer.resources">منابع</h4>
        <ul>
          <li>
            <a href="#" target="_blank" data-i18n="footer.originalPaper">
              مقاله اصلی BFO
            </a>
          </li>
          <li>
            <a href="#" target="_blank" data-i18n="footer.github">
              مستندات GitHub
            </a>
          </li>
          <li>
            <a href="#" target="_blank" data-i18n="footer.references">
              مراجع علمی
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer__bottom">
      <p data-i18n="footer.copyright">© 2025 BFO Educational Platform | MIT License</p>
      <p>
        <span data-i18n="footer.university">دانشگاه</span>
        <span id="universityName">---</span>
        |
        <span data-i18n="footer.aiCourse">دوره هوش مصنوعی</span>
      </p>
    </div>
  </div>
</footer>
`;

export function initializeFooter() {
  const footerElement = document.createElement('div');
  footerElement.innerHTML = footerHTML;
  document.body.appendChild(footerElement.firstElementChild);
}

export { footerHTML };
