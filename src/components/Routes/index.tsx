
type Props = {
    path:any;
    children:any;
};
export default function Routes(url: Props) {
  return (
    window.location.pathname === url.path ? url.children : null
  );
}

