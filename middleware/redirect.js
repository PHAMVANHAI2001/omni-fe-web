export default function ({ route, redirect }) {
    // console.log("route.path:", route.path);
    if (route.path === '/') {
      redirect('/home')
    }
  }