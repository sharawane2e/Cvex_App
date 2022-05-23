
type Props = {
  href: any;
  children: any;
  className:any;
};
export default function Link(props: Props) {
  return (
    <>
      <a className={props.className} href={props.href}>{props.children}</a>
    </>
  );
}
