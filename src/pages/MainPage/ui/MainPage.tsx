import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = memo(() => {
    const { t } = useTranslation();
    // For counter
    // const [value, setValue] = useState('');
    //
    // const onChange = (val: string) => {
    //     setValue(val);
    // };

    return (
        <div>
            {t('main')}
        </div>
    );
});

export default MainPage;
