import NumberFlow from '@number-flow/react'
import clsx from 'clsx/lite'
import { Minus, Plus } from 'lucide-react'
import * as React from 'react'

type Props = {
	value?: number
	min?: number
	max?: number
	onChange?: (value: number) => void
}

export default function NumberInput({
	value = 0,
	min = 0,
	max = Infinity,
	onChange = () => {},
}: Props) {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const [animated, setAnimated] = React.useState(true)
	const [showCaret, setShowCaret] = React.useState(true)

	const handleInput: React.ChangeEventHandler<HTMLInputElement> = ({ currentTarget: el }) => {
		setAnimated(false)
		const num = parseInt(el.value)
		const next = isNaN(num) ? value : Math.min(Math.max(num, min), max)
		el.value = String(next)
		onChange(next)
	}

	const handlePointerDown = (diff: number) => (event: React.PointerEvent<HTMLButtonElement>) => {
		setAnimated(true)
		if (event.pointerType === 'mouse') {
			inputRef.current?.focus()
		}
		const newVal = Math.min(Math.max(value + diff, min), max)
		console.log(newVal)
		onChange(newVal)
	}

	return (
		<div className="group flex flex-col items-stretch rounded-md text-3xl font-semibold ring ring-zinc-200 transition-[box-shadow] focus-within:ring-2 focus-within:ring-[#fc0] dark:ring-zinc-800">
		
			<button
				aria-hidden="true"
				tabIndex={-1}
				className="flex items-center justify-center p-3"
				disabled={value >= max}
				onPointerDown={handlePointerDown(1)}
			>
				<Plus className="size-4" absoluteStrokeWidth strokeWidth={3.5} />
			</button>
			<div className="relative grid items-center justify-items-center text-center [grid-template-areas:'overlap'] *:[grid-area:overlap]">
				<input
					ref={inputRef}
					className={clsx(
						showCaret ? 'caret-primary' : 'caret-transparent',
						'spin-hide w-[1.5em] bg-transparent py-2 text-center font-[inherit] text-transparent outline-none'
					)}
					style={{ fontKerning: 'none' }}
					inputMode="numeric"
					autoComplete="off"
					min={min}
					max={max}
					value={value}
					onInput={handleInput}
				/>
				<NumberFlow
					value={value}
					format={{ useGrouping: false }}
					aria-hidden="true"
					animated={animated}
					onAnimationsStart={() => setShowCaret(false)}
					onAnimationsFinish={() => setShowCaret(true)}
					className="pointer-events-none"
					willChange
				/>
			</div>
			<button
				aria-hidden="true"
				tabIndex={-1}
				className="flex items-center justify-center p-3"
				disabled={value <= min}
				onPointerDown={handlePointerDown(-1)}
			>
				<Minus className="size-4" absoluteStrokeWidth strokeWidth={3.5} />
			</button>
		</div>
	)
}
