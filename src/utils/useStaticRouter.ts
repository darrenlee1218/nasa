import { NextRouter, useRouter } from 'next/router';
import { useMemo } from 'react';

// the instance of `useRouter` changes on every render so you can't use it as a dependency of useEffect
// this makes it change only if the pathname or asPath change (hopefully this covers all route transitions)
// TODO: https://github.com/vercel/next.js/issues/18127
export function useStaticRouter() {
  const router = useRouter();
  return useMemo(
    () => router,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.pathname, router.asPath],
  );
}

export const pathnameIncludes = (router: NextRouter, pathname: string): boolean => {
  const splits = router.pathname.split('?'); // for links like /blog?postId=123

  if (!splits.length) {
    return false;
  }

  const path = splits[0];

  if (pathname === '/') {
    // special case because every path will include home
    return path === '/';
  }

  if (!path.startsWith(pathname)) {
    return false;
  }

  const splitsAfterUrl = path.split(pathname);

  return (
    splitsAfterUrl.length < 2 ||
    splitsAfterUrl[1] === '/' ||
    splitsAfterUrl[1] === '' ||
    splitsAfterUrl[1].startsWith('?')
  );
};
