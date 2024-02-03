import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(({ className, block }: ArticleTextBlockComponentProps) => {
    const { t } = useTranslation();

    return (
        <div
            className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
        >
            {block.title && (
                <Text title={block.title} class={cls.title} />
            )}
        </div>
    );
});
