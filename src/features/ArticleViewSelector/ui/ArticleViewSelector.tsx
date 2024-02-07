import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleView } from 'entities/Article';
import listIcon from 'shared/assets/icons/list-24-24.svg';
import TiledIcon from 'shared/assets/icons/tiled-24-24.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView,
    onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: listIcon,
    },
    {
        view: ArticleView.BIG,
        icon: TiledIcon,
    },
];

export const ArticleViewSelector = (props: ArticleViewSelectorProps) => {
    const { className, onViewClick, view } = props;

    // Обычно онклик принимает event, но в данном случае нам нужно предавать новый вид отображения которой пользователь выбрал не event, как обычно
    // делаем функцию, которая вызывает функцию, и на верхнем уровне передаем viewType.view (своего рода замыкаение)

    // В onClick мы не передаем функцию (ссылку), а ее вызываем onClick(viewType.view) и вызов этой функйии вернет нам новую функцию onClick в которую мы передаем уже наши дынные
    // если просто передать не вызвать onClick, то туда передаетсья event стандартный
    const onClick = (newView: ArticleView) => () => { // внешняя функция принимает значения
        onViewClick?.(newView); // замыкаем значение  // попадает как слушатель события в он клик
    };

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(viewType.view)}
                >
                    <Icon
                        Svg={viewType.icon}
                        className={classNames('', { [cls.notSelected]: viewType.view !== view })}
                    />
                </Button>
            ))}
        </div>
    );
};
