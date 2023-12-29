import React from 'react';
import { useTranslation } from 'react-i18next';
import { Counter } from 'entities/Counter';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Counter />
            <div>
                {t('main')}
            </div>
        </>
    );
};

export default MainPage;
