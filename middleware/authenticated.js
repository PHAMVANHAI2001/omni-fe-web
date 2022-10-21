export default function({ app, store, redirect, route }) {
  
  if (!process.server && !localStorage.getItem("id_token")) {
    return redirect(`/login?callbackurl=${route.path}`);
  }

}
