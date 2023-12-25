const routes = {
    root: '/',
    notFound: '/404',
    signIn: '/sign-in',
    dashboard: {
      root: '/dashboard/*',
      dishes: '/dashboard/dishes',
      orders: '/dashboard/orders',
      feedback: '/dashboard/feedback',
    }
  };
  
  export default routes;
  