import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

// criando uma interface para o componente
// para que ele possa receber os dados que serão exibidos
interface NoteCardProps {
	note: {
		id: string;
		date: Date;
		content: string;
	};
	onNoteDeleted: (id: string) => void;
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger className="rounded-md text-left flex flex-col bg-gradient-to-b from-slate-800/100 to-slate-800/10 p-5 gap-3 overflow-hidden hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-200">
				<span className="text-sm font-medium text-slate-300">
					{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
				</span>
				<p className="text-sm leading-6 text-slate-400">{note.content}</p>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="inset-0 fixed bg-black/50" />
				<Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
					<Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
						<X className="size-5" />
					</Dialog.Close>
					<div className="flex flex-1 flex-col gap-3 p-5">
						<span className="text-sm font-medium text-slate-300">
							{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
						</span>
						<p className="text-sm leading-6 text-slate-400">{note.content}</p>
					</div>
					<button
						type="button"
						onClick={() => onNoteDeleted(note.id)}
						className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group">
						Deseja <span className="text-red-400 group-hover:underline">apagar essa nota</span>?
					</button>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
