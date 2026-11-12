interface NavigateEvent extends Event {
  destination: { url: string };
}

export function onFragmentNavigation(callback: () => void): () => void {
  const navigation = (window as Window & { navigation?: EventTarget }).navigation;
  const onNavigate = (event: Event) => {
    const url = new URL((event as NavigateEvent).destination.url);
    const here = new URL(location.href);
    if (url.hash && url.origin === here.origin && url.pathname === here.pathname) callback();
  };

  navigation?.addEventListener('navigate', onNavigate);
  window.addEventListener('hashchange', callback);
  window.addEventListener('popstate', callback);
  return () => {
    navigation?.removeEventListener('navigate', onNavigate);
    window.removeEventListener('hashchange', callback);
    window.removeEventListener('popstate', callback);
  };
}
