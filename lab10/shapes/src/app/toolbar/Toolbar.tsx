import {type ShapeType} from '../../model/types'

interface ToolbarProps {
	onAdd: (type: ShapeType) => void,
	onDelete: () => void,
	onUndo: () => void,
	onRedo: () => void,
	hasSelection: boolean,
	canUndo: boolean,
	canRedo: boolean,
	title: string,
}

function Toolbar({
	onAdd,
	onDelete,
	onUndo,
	onRedo,
	hasSelection,
	canUndo,
	canRedo,
	title,
}: ToolbarProps) {
	return (
		<div className="toolbar">
			<div className="toolbar-title">{title}</div>
			<div className="toolbar-actions">
				<button type="button" onClick={() => onAdd('rectangle')}>Прямоугольник</button>
				<button type="button" onClick={() => onAdd('ellipse')}>Эллипс</button>
				<button type="button" onClick={() => onAdd('triangle')}>Треугольник</button>
				<button type="button" onClick={onDelete} disabled={!hasSelection}>Удалить</button>
				<button type="button" onClick={onUndo} disabled={!canUndo}>Отменить</button>
				<button type="button" onClick={onRedo} disabled={!canRedo}>Повторить</button>
			</div>
		</div>
	)
}

export {
	Toolbar,
}

