require("dotenv").config();

const bcrypt = require("bcrypt");

module.exports = {
  users: [
    {
      id: "0",
      username: "admin",
      password: bcrypt.hash(process.env.DEFAULT_ADMIN_PASS, 10),
      firstname: "Admin",
      lastname: "Default",
      email: "realhome@gmail.com",
      avatar_url: null,
      favorites: null,
      wishlist: null,
      role: "admin",
    },
    {
      id: "1",
      username: "agent",
      password: bcrypt.hash(process.env.DEFAULT_AGENT_PASS, 10),
      firstname: "Agent",
      lastname: "Default",
      email: null,
      avatar_url: null,
      favorites: null,
      wishlist: null,
      role: "agent",
    },
    {
      id: "2",
      username: "user",
      password: bcrypt.hash(process.env.DEFAULT_USER_PASS, 10),
      firstname: "User",
      lastname: "Default",
      email: null,
      avatar_url: null,
      favorites: null,
      wishlist: null,
      role: "user",
    },
  ],
  properties: [
    {
      id: "0",
      agent_id: "1",
      title: "New Apartment Nice View",
      description:
        "Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood",
      listing_type: "rent",
      price: 638000,
      bedrooms: 3,
      bathrooms: 2,
      google_place_id:
        "EjAzMDEgWmlnemFnIFRyYWlsIFBhdGgsIEJldHR5J3MgQmF5LCBTb3V0aCBBZnJpY2EiLiosChQKEgljvUdSx9bNHREkGR9JmaYY-hIUChIJL_HfyKPWzR0RoBg0oJi6AEM",
      banner_url: null,
      images: null,
      featured: true,
      delisted: false,
    },
    {
      id: "1",
      agent_id: "1",
      title: "Modern Apartments",
      description:
        "Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood",
      listing_type: "sell",
      price: 638000,
      bedrooms: 3,
      bathrooms: 2,
      google_place_id:
        "EjMyMTIyIEdsZWVtb29yIFJkLCBHbGVlbW9vciwgQ2FwZSBUb3duLCBTb3V0aCBBZnJpY2EiLiosChQKEglxaPgTrVzMHRFVr1FN7W1yAxIUChIJnyhiOa1czB0RNX-1PrKkn6Q",
      banner_url: null,
      images: null,
      featured: true,
      delisted: false,
    },
    {
      id: "2",
      agent_id: "1",
      title: "Comfortable Apartment",
      description:
        "Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood",
      listing_type: "rent",
      price: 638000,
      bedrooms: 3,
      bathrooms: 2,
      google_place_id:
        "EjsxMjM0IEphY2FyYW5kYSBBdmVudWUsIEdyYXNzeSBQYXJrLCBDYXBlIFRvd24sIFNvdXRoIEFmcmljYSIuKiwKFAoSCRFtBJ7fQ8wdEeWKU5xQIC8jEhQKEgnVoqOAU0HMHRE3qM0qwmVWBA",
      banner_url: null,
      images: null,
      featured: true,
      delisted: false,
    },
    {
      id: "2",
      agent_id: "1",
      title: "Luxury Villa",
      description:
        "Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood",
      listing_type: "sell",
      price: 638000,
      bedrooms: 3,
      bathrooms: 2,
      google_place_id:
        "Ejo1Njc4IFByb3RlYSBTdHJlZXQsIENoYXBtYW5zIFBlYWssIENhcGUgVG93biwgU291dGggQWZyaWNhIi4qLAoUChIJ9waeJb9rzB0RNdf_glcJlf4SFAoSCeXBrfu5a8wdEe6klS9ELMiF",
      banner_url: null,
      images: null,
      featured: true,
      delisted: false,
    },
  ],
};
