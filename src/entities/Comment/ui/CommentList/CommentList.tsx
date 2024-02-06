import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../../ui/CommentCard/CommentCard';
import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string;
    comments: Array<Comment>
    isLoading?: boolean
}

// Этот компонет переиспользуемый, его можем использовать везде поэтому комментари передаем из вне
export const CommentList = (props: CommentListProps) => {
    const { t } = useTranslation('comments');
    const { className, comments, isLoading } = props;

    if (isLoading) {
        return (
            <div
                className={classNames(cls.CommentList, {}, [className, cls.loading])}
            >
                <CommentCard isLoading={isLoading} />
                <CommentCard isLoading={isLoading} />
                <CommentCard isLoading={isLoading} />
            </div>
        );
    }

    return (
        <div
            className={classNames(cls.CommentList, {}, [className])}
        >
            {comments.length ? comments.map((comment) => (
                <CommentCard
                    isLoading={isLoading}
                    className={cls.comment}
                    comment={comment}
                />
            ))
                : <Text text={t('noComments')} />}
        </div>
    );
};
