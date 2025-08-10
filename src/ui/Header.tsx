import { Logo } from "./Logo";

type Status = "online" | "offline";
type HeaderProps = {
  title: string;
  status: Status;
  onClose: () => void;
};

export function Header({ title, status, onClose }: HeaderProps) {
  return (
    <div className="eqt-header">
      <Logo className="eqt-logo" />
      <div className="eqt-title">{title}</div>
      <span className={`eqt-status eqt-status--${status}`}>● {status}</span>
      <button className="eqt-close" type="button" onClick={onClose}>
        ×
      </button>
    </div>
  );
}
