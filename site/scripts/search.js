/**
 * search.js — Pagefind Search Integration
 *
 * Makes the USWDS search bar in the site header functional by intercepting
 * form submissions and redirecting to the search results page with the
 * user's query as a URL parameter.
 *
 * How it works:
 *   1. Finds the <form role="search"> element (the USWDS search bar in the header).
 *   2. Prevents the default form submission (which would go nowhere).
 *   3. Reads the search input value and redirects to search-results.html?q=<query>.
 *   4. The search-results.html page loads Pagefind UI, reads the ?q= parameter,
 *      and displays matching results from the pre-built Pagefind index.
 *
 * Dependencies:
 *   - Pagefind must be run during the build/deploy step to generate the search
 *     index. See .github/workflows/deploy.yml for the "Index site with Pagefind" step.
 *   - The search results page lives at /site/pages/search-results.html and loads
 *     /_pagefind/pagefind-ui.js and /_pagefind/pagefind-ui.css from the build output.
 *
 * Usage:
 *   Add this script to any page that has the USWDS search bar in its header.
 *   It should be loaded after uswds.min.js in the scripts section at the bottom:
 *
 *     <script src="/dist/uswds/js/uswds.min.js"></script>
 *     <script src="/site/scripts/search.js"></script>
 *
 */
(function () {
  var form = document.querySelector('form[role="search"]');
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var query = form.querySelector('input[type="search"]').value.trim();
    if (query) {
      window.location.href = "/site/pages/search-results.html?q=" + encodeURIComponent(query);
    }
  });
})();
