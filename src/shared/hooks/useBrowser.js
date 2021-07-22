function useBrowser(cb) {
  if (typeof window !== 'undefined') {
    return cb;
  }
  return null;
}

export default useBrowser;
