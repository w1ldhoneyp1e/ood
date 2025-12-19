import {type ShapeType} from '../../model/types'

interface ToolbarProps {
	onAdd: (type: ShapeType) => void,
	onDelete: () => void,
	hasSelection: boolean,
	title: string,
}

function Toolbar({
	onAdd,
	onDelete,
	hasSelection,
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
			</div>
		</div>
	)
}

export {
	Toolbar,
}

