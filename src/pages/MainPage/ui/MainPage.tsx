import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();
    // For counter
    // const [value, setValue] = useState('');
    //
    // const onChange = (val: string) => {
    //     setValue(val);
    // };

    return <Page>{t('main')}</Page>;
});

export default MainPage;
