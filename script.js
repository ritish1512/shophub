document.addEventListener('DOMContentLoaded', () => {
  // #region agent log
  fetch('http://127.0.0.1:7650/ingest/51ac3339-12ed-4b8e-860b-8b7f9e96c266',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b9d632'},body:JSON.stringify({sessionId:'b9d632',runId:'pre-fix',hypothesisId:'H1',location:'script.js:1',message:'DOMContentLoaded fired for home scripts',data:{path:window.location.pathname},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  const logoutButton = document.getElementById('logout-button');
  const headerUser = document.getElementById('header-user');
  const loggedIn = localStorage.getItem('shopHubLoggedIn') === 'true';
  const currentUser = localStorage.getItem('shopHubName') || localStorage.getItem('shopHubEmail') || 'Guest';

  if (headerUser) {
    headerUser.textContent = loggedIn ? `Hi, ${currentUser}` : 'Guest';
  }

  if (logoutButton) {
    if (!loggedIn) {
      window.location.href = 'index.html';
      return;
    }

    logoutButton.addEventListener('click', () => {
      localStorage.setItem('shopHubLoggedIn', 'false');
      localStorage.removeItem('shopHubCurrentUser');
      localStorage.removeItem('shopHubRememberMe');
      window.location.href = 'index.html';
    });
  }

  // Category filtering functionality
  const categoryLinks = document.querySelectorAll('.category-link');
  const productCards = document.querySelectorAll('.product-card');
  const productsSection = document.querySelector('.products-section');
  const searchInput = document.querySelector('.search-box input');
  const searchIcon = document.querySelector('.search-box i');
  // #region agent log
  fetch('http://127.0.0.1:7650/ingest/51ac3339-12ed-4b8e-860b-8b7f9e96c266',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b9d632'},body:JSON.stringify({sessionId:'b9d632',runId:'post-fix',hypothesisId:'H7',location:'script.js:34',message:'Search elements resolved',data:{hasSearchInput:!!searchInput,hasSearchIcon:!!searchIcon},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const selectedCategory = link.getAttribute('data-category');

      // Filter and display products
      productCards.forEach(card => {
        if (selectedCategory === 'all') {
          card.classList.remove('hidden');
        } else {
          // Check if product card has the selected category class
          if (card.classList.contains(selectedCategory)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });

      // Scroll to products section
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Search functionality
  function filterProducts(searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();

    productCards.forEach(card => {
      const productName = card.querySelector('.product-name').textContent.toLowerCase();
      const productDescription = card.querySelector('.product-description').textContent.toLowerCase();

      if (productName.includes(lowerSearchTerm) || productDescription.includes(lowerSearchTerm)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  function runSearch(searchTerm, source) {
    const normalizedTerm = searchTerm.trim();
    // #region agent log
    fetch('http://127.0.0.1:7650/ingest/51ac3339-12ed-4b8e-860b-8b7f9e96c266',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b9d632'},body:JSON.stringify({sessionId:'b9d632',runId:'post-fix',hypothesisId:'H5',location:'script.js:runSearch',message:'runSearch called',data:{source,searchTermLength:normalizedTerm.length,hasProductsSection:!!productsSection},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    if (normalizedTerm === '') {
      productCards.forEach(card => {
        card.classList.remove('hidden');
      });
      return;
    }

    filterProducts(normalizedTerm);
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  window.__debugRunSearch = runSearch;

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();

    if (searchTerm === '') {
      // Show all products if search is empty
      productCards.forEach(card => {
        card.classList.remove('hidden');
      });
    } else {
      // Filter products based on search term (without scrolling)
      filterProducts(searchTerm);
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // #region agent log
      fetch('http://127.0.0.1:7650/ingest/51ac3339-12ed-4b8e-860b-8b7f9e96c266',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b9d632'},body:JSON.stringify({sessionId:'b9d632',runId:'pre-fix',hypothesisId:'H5',location:'script.js:88',message:'Header search Enter pressed',data:{searchTermLength:searchInput.value.trim().length},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      runSearch(searchInput.value, 'header-enter');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      // #region agent log
      fetch('http://127.0.0.1:7650/ingest/51ac3339-12ed-4b8e-860b-8b7f9e96c266',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b9d632'},body:JSON.stringify({sessionId:'b9d632',runId:'post-fix',hypothesisId:'H7',location:'script.js:global-enter',message:'Global Enter captured',data:{targetTag:e.target && e.target.tagName ? e.target.tagName : 'unknown',targetClass:e.target && e.target.className ? String(e.target.className).slice(0,80) : ''},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    }
  });

  // Search on icon click
  searchIcon.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    // #region agent log
    fetch('http://127.0.0.1:7650/ingest/51ac3339-12ed-4b8e-860b-8b7f9e96c266',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b9d632'},body:JSON.stringify({sessionId:'b9d632',runId:'pre-fix',hypothesisId:'H5',location:'script.js:89',message:'Header search icon clicked',data:{searchTermLength:searchTerm.length},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    runSearch(searchTerm, 'header-icon');
  });

  // Sidenav search functionality
  const sidenavSearchInput = document.querySelector('.sidenav-search .search-box input');
  const sidenavSearchIcon = document.querySelector('.sidenav-search .search-box i');

  if (sidenavSearchInput && sidenavSearchIcon) {
    sidenavSearchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.trim();

      if (searchTerm === '') {
        // Show all products if search is empty
        productCards.forEach(card => {
          card.classList.remove('hidden');
        });
      } else {
        // Filter products based on search term
        filterProducts(searchTerm);
      }
    });

    sidenavSearchIcon.addEventListener('click', () => {
      const searchTerm = sidenavSearchInput.value.trim();
      // #region agent log
      fetch('http://127.0.0.1:7650/ingest/51ac3339-12ed-4b8e-860b-8b7f9e96c266',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b9d632'},body:JSON.stringify({sessionId:'b9d632',runId:'pre-fix',hypothesisId:'H5',location:'script.js:118',message:'Sidenav search icon clicked',data:{searchTermLength:searchTerm.length},timestamp:Date.now()})}).catch(()=>{});
      // #endregion

      runSearch(searchTerm, 'sidenav-icon');
      // Close sidenav after search
      sidenav.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    sidenavSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        runSearch(sidenavSearchInput.value, 'sidenav-enter');
        sidenav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Back to top functionality
  const backToTopButton = document.getElementById('back-to-top');

  function toggleBackToTop() {
    const productsSection = document.querySelector('.products-section');
    if (!productsSection || !backToTopButton) return;

    const sectionRect = productsSection.getBoundingClientRect();
    const isInProductSection = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;
    // #region agent log
    fetch('http://127.0.0.1:7650/ingest/51ac3339-12ed-4b8e-860b-8b7f9e96c266',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b9d632'},body:JSON.stringify({sessionId:'b9d632',runId:'pre-fix',hypothesisId:'H4',location:'script.js:140',message:'Back to top visibility evaluated',data:{isInProductSection,top:Math.round(sectionRect.top),bottom:Math.round(sectionRect.bottom),viewportHeight:window.innerHeight},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if (isInProductSection) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if (backToTopButton) {
    window.addEventListener('scroll', toggleBackToTop);
    backToTopButton.addEventListener('click', scrollToTop);
    toggleBackToTop();
  }

  // Wishlist and Cart functionality
  // currentUser is already declared above

  function getWishlist() {
    const wishlistKey = `shopHubWishlist_${currentUser}`;
    const stored = localStorage.getItem(wishlistKey);
    return stored ? JSON.parse(stored) : [];
  }

  function saveWishlist(wishlist) {
    const wishlistKey = `shopHubWishlist_${currentUser}`;
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  }

  function toggleWishlist(productId) {
    if (!loggedIn) {
      window.location.href = 'index.html';
      return;
    }

    const wishlist = getWishlist();
    const heartIcon = document.querySelector(`.heart-icon[data-id="${productId}"]`);
    const productCard = heartIcon.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;
    const isInWishlist = wishlist.some(item => item.id === productId);

    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(item => item.id !== productId);
      saveWishlist(updatedWishlist);
      heartIcon.classList.remove('active');
      alert(`${productName} removed from wishlist!`);
    } else {
      // Add to wishlist
      const product = {
        id: productId,
        name: productCard.querySelector('.product-name').textContent,
        description: productCard.querySelector('.product-description').textContent,
        price: productCard.querySelector('.product-price').textContent,
        image: productCard.querySelector('.product-image').src
      };
      wishlist.push(product);
      saveWishlist(wishlist);
      heartIcon.classList.add('active');
      alert(`${productName} added to wishlist!`);
    }
  }

  function addToCart(productId) {
    if (!loggedIn) {
      window.location.href = 'index.html';
      return;
    }

    const cartKey = `shopHubCart_${currentUser}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
    const addToCartBtn = document.querySelector(`.add-to-cart-btn[data-id="${productId}"]`);
    const product = {
      id: productId,
      name: productCard.querySelector('.product-name').textContent,
      description: productCard.querySelector('.product-description').textContent,
      price: productCard.querySelector('.product-price').textContent,
      image: productCard.querySelector('.product-image').src
    };

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    
    // Visual feedback like wishlist
    addToCartBtn.classList.add('added');
    addToCartBtn.textContent = 'Added to Cart!';
    
    // Reset button after 2 seconds
    setTimeout(() => {
      addToCartBtn.classList.remove('added');
      addToCartBtn.textContent = 'Add to Cart';
    }, 2000);
  }

  function buyNow(productId) {
    if (!loggedIn) {
      window.location.href = 'index.html';
      return;
    }

    const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
    const product = {
      id: productId,
      name: productCard.querySelector('.product-name').textContent,
      description: productCard.querySelector('.product-description').textContent,
      price: productCard.querySelector('.product-price').textContent,
      image: productCard.querySelector('.product-image').src
    };

    // Store the product for checkout
    localStorage.setItem('buyNowProduct', JSON.stringify(product));
    window.location.href = 'address.html';
  }

  function updateHeartIcons() {
    if (!loggedIn) return;

    const wishlist = getWishlist();
    const heartIcons = document.querySelectorAll('.heart-icon');

    heartIcons.forEach(icon => {
      const productId = icon.getAttribute('data-id');
      const isInWishlist = wishlist.some(item => item.id === productId);
      if (isInWishlist) {
        icon.classList.add('active');
      } else {
        icon.classList.remove('active');
      }
    });
  }

  function updateCartButtons() {
    if (!loggedIn) return;

    const cartKey = `shopHubCart_${currentUser}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');

    cartButtons.forEach(button => {
      const productId = button.getAttribute('data-id');
      const isInCart = cart.some(item => item.id === productId);
      if (isInCart) {
        button.classList.add('in-cart');
        button.textContent = 'In Cart';
      } else {
        button.classList.remove('in-cart');
        button.textContent = 'Add to Cart';
      }
    });
  }

  // Add event listeners to heart icons and add to cart buttons
  document.querySelectorAll('.heart-icon').forEach(icon => {
    icon.addEventListener('click', (event) => {
      event.stopPropagation();
      const productId = icon.getAttribute('data-id');
      toggleWishlist(productId);
    });
  });

  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const productId = button.getAttribute('data-id');
      addToCart(productId);
    });
  });

  document.querySelectorAll('.Buy-now').forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const productId = button.getAttribute('data-id');
      buyNow(productId);
    });
  });

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('.heart-icon') || event.target.closest('.add-to-cart-btn') || event.target.closest('.Buy-now')) {
        return;
      }
      const productId = card.getAttribute('data-id');
      if (productId) {
        window.location.href = `product.html?id=${encodeURIComponent(productId)}`;
      }
    });
  });

  // Update heart icons on page load
  updateHeartIcons();
  updateCartButtons();

  // Mobile Sidenav functionality
  const menuBtn = document.querySelector('.menu');
  const sidenav = document.getElementById('sidenav');
  console.log('menuBtn:', menuBtn);
  console.log('sidenav:', sidenav);
  const sidenavClose = document.getElementById('sidenav-close');
  const sidenavUser = document.getElementById('sidenav-user');
  const sidenavLogout = document.getElementById('sidenav-logout');
  let overlay;

  if (menuBtn && sidenav) {
    // Create overlay
    overlay = document.createElement('div');
    overlay.className = 'sidenav-overlay';
    document.body.appendChild(overlay);

    // Toggle sidenav
    function toggleSidenav() {
      console.log('Toggling sidenav');
      // #region agent log
      fetch('http://127.0.0.1:7650/ingest/51ac3339-12ed-4b8e-860b-8b7f9e96c266',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b9d632'},body:JSON.stringify({sessionId:'b9d632',runId:'pre-fix',hypothesisId:'H2',location:'script.js:365',message:'toggleSidenav invoked',data:{wasOpen:sidenav.classList.contains('open')},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      sidenav.classList.toggle('open');
      overlay.classList.toggle('active');
      document.body.style.overflow = sidenav.classList.contains('open') ? 'hidden' : 'auto';
    }

    // Event listeners
    menuBtn.addEventListener('click', toggleSidenav);
    // #region agent log
    fetch('http://127.0.0.1:7650/ingest/51ac3339-12ed-4b8e-860b-8b7f9e96c266',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b9d632'},body:JSON.stringify({sessionId:'b9d632',runId:'pre-fix',hypothesisId:'H2',location:'script.js:372',message:'Sidenav listeners bound',data:{hasMenuBtn:!!menuBtn,hasSidenavClose:!!sidenavClose},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    console.log('Event listener added to menuBtn');
    sidenavClose.addEventListener('click', toggleSidenav);
    overlay.addEventListener('click', toggleSidenav);

    // Update sidenav user info
    function updateSidenavUser() {
      if (sidenavUser) {
        sidenavUser.textContent = loggedIn ? `Hi, ${currentUser}` : 'Guest';
      }
    }

    // Handle sidenav logout
    if (sidenavLogout) {
      sidenavLogout.addEventListener('click', () => {
        localStorage.setItem('shopHubLoggedIn', 'false');
        localStorage.removeItem('shopHubCurrentUser');
        localStorage.removeItem('shopHubRememberMe');
        window.location.href = 'index.html';
      });
    }

    // Update sidenav user on load
    updateSidenavUser();

    // Update sidenav user when header user changes
    const headerUser = document.getElementById('header-user');
    if (headerUser) {
      const observer = new MutationObserver(updateSidenavUser);
      observer.observe(headerUser, { childList: true, subtree: true });
    }

    // Handle sidenav navigation active state
    function updateSidenavActive() {
      const currentPage = window.location.pathname.split('/').pop() || 'home.html';
      const sidenavLinks = document.querySelectorAll('.sidenav-link');
      // #region agent log
      fetch('http://127.0.0.1:7650/ingest/51ac3339-12ed-4b8e-860b-8b7f9e96c266',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b9d632'},body:JSON.stringify({sessionId:'b9d632',runId:'pre-fix',hypothesisId:'H3',location:'script.js:407',message:'Sidenav active state update called',data:{currentPage,viewportWidth:window.innerWidth},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      
      sidenavLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
          link.classList.add('active');
        }
      });
      
      // Special case for home page
      if (currentPage === '' || currentPage === 'index.html') {
        const homeLink = document.querySelector('.sidenav-link[href="home.html"]');
        if (homeLink) homeLink.classList.add('active');
      }
    }

    // Close sidenav when clicking on links
    const sidenavLinks = document.querySelectorAll('.sidenav-link');
    sidenavLinks.forEach(link => {
      link.addEventListener('click', () => {
        sidenav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }
});
