export const registerFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const loginFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter gadget title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter gadget description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "smartphones", label: "Smartphones" },
        { id: "laptops", label: "Laptops" },
        { id: "monitors", label: "Monitors" },
        { id: "accessories", label: "Accessories" },
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: [
        { id: "apple", label: "Apple" },
        { id: "samsung", label: "Samsung" },
        { id: "sony", label: "Sony" },
        { id: "dell", label: "Dell" },
        { id: "hp", label: "HP" },
        { id: "lenovo", label: "Lenovo" },
        { id: "google", label: "Google" },
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter gadget price",
    },
    {
      label: "Storage",
      name: "storage",
      componentType: "select",
      options: [
        { id: "32GB", label: "32GB" },
        { id: "64GB", label: "64GB" },
        { id: "128GB", label: "128GB" },
        { id: "256GB", label: "256GB" },
        { id: "512GB", label: "512GB" },
        { id: "1TB", label: "1TB" },
        { id: "2TB", label: "2TB" },
      ],
    },
    
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
    {
      label: "Condition",
      name: "condition",
      componentType: "select",
      options: [
        { id: "Brand New", label: "Brand New" },
        { id: "Premium Used", label: "Premium Used" },
      ],
    },
  ];
  
  export const shoppingViewHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home",
    },
    {
      id: "products",
      label: "Products",
      path: "/shop/listing",
    },
    {
      id: "smartphones",
      label: "Smartphones",
      path: "/shop/listing",
    },
    {
        id: "monitors",
        label: "Monitors",
        path: "/shop/listing",
      },
    {
      id: "laptops",
      label: "Laptops",
      path: "/shop/listing",
    },
    {
      id: "accessories",
      label: "Accessories",
      path: "/shop/listing",
    },
    {
      id: "about",
      label: "About",
      path: "/shop/about",
    },
  ];
  
  export const categoryOptionsMap = {
    smartphones: "Smartphones",
    laptops: "Laptops",
    monitors: "Monitors",
    accessories: "Accessories",
  };
  
  export const brandOptionsMap = {
    apple: "Apple",
    samsung: "Samsung",
    sony: "Sony",
    dell: "Dell",
    hp: "HP",
    lenovo: "Lenovo",
    google: "Google",
  };
  
  export const filterOptions = {
    category: [
      { id: "smartphones", label: "Smartphones" },
      { id: "laptops", label: "Laptops" },
      { id: "monitors", label: "Monitors" },
      { id: "accessories", label: "Accessories" },
      
    ],
    brand: [
      { id: "apple", label: "Apple" },
      { id: "samsung", label: "Samsung" },
      { id: "sony", label: "Sony" },
      { id: "dell", label: "Dell" },
      { id: "hp", label: "HP" },
      { id: "lenovo", label: "Lenovo" },
      { id: "google", label: "Google" },
      
    ],
    storage: [
      { id: "32GB", label: "32GB" },
      { id: "64GB", label: "64GB" },
      { id: "128GB", label: "128GB" },
      { id: "256GB", label: "256GB" },
      { id: "512GB", label: "512GB" },
      { id: "1TB", label: "1TB" },
      { id: "2TB", label: "2TB" },
    ],
    priceRange: {
      min: 0,
      max: 5000000, // You can dynamically calculate this from products too
    },
    condition: [
      // New condition filter added
      { id: "Brand New", label: "Brand New" },
      { id: "Premium Used", label: "Premium Used" },
    ],
  };
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  
