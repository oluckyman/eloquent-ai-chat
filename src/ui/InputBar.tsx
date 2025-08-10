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
        <button className="eqt-send" type="submit" disabled={value.trim().length === 0 || waiting || maintenance}>
          {waiting ? "…" : "↑"}
        </button>
      </form>
    </>
  );
}
