import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { addCommentFormError, addCommentFormText } from '../../model/selector/addCommentFormSelectors';
import cls from './AddCommentForm.module.scss';
import { addCommentFormAction, addCommentFormReducer } from '../../model/slice/AddCommentFormSlice';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void
}

const reducer: ReducerList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = ({ className, onSendComment }: AddCommentFormProps) => {
    const { t } = useTranslation('article');
    const text = useSelector(addCommentFormText);
    const error = useSelector(addCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormAction.setText(value));
    }, [dispatch]);

    // Делаем обвертку для вызова двух функций, одна передаетсья вверх пропсами onSendComment
    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
            <div
                className={classNames(cls.AddCommentForm, {}, [className])}
            >
                <Input
                    className={cls.input}
                    placeholder={t('commentText')}
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onSendHandler}
                >
                    {t('send')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
};

export default AddCommentForm;
