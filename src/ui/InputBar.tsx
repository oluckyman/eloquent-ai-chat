import { type FormEvent } from "react";

type InputBarProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  waiting?: boolean;
  maintenance?: boolean;
  maintenanceMessage?: string;
};

export function InputBar({ value, onChange, onSubmit, waiting, maintenance, maintenanceMessage }: InputBarProps) {
  return (
    <>
      {maintenance && <div className="eqt-maintenance">{maintenanceMessage}</div>}
      <form className={`eqt-inputRow ${maintenance ? "eqt-inputRow--maintenance" : ""}`} onSubmit={onSubmit}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a message…"
          autoFocus
          autoComplete="off"
          disabled={maintenance}
        />
        <button
          className="eqt-send eqt-button"
          type="submit"
          disabled={value.trim().length === 0 || waiting || maintenance}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 15 12 9 18 15" />
            <line x1="12" y1="10" x2="12" y2="20" />
          </svg>
        </button>
      </form>
    </>
  );
}
