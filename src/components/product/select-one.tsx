import { useState } from 'react';
import { ProductInquiry } from '../../libs/types/product';

interface Props {
    setProductSearch: React.Dispatch<React.SetStateAction<ProductInquiry>>;
}

export default function SelectOne({ setProductSearch }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Select by Order");

    const options = [
        { label: "New", value: "createdAt" },
        { label: "Price", value: "productPrice" },
        { label: "View", value: "productViews" },
    ];

    const handleSelect = (option: { label: string; value: string }) => {
        setSelectedOption(option.label);
        setProductSearch(prev => ({
            ...prev,
            page: 1,
            order: option.value
        }));
        setIsOpen(false);
    };

    return (
        <div className={`nice-select bg-white dark:bg-dark outline-select small-select ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <span className="current">{selectedOption}</span>
            <ul className="list">
                {options.map((item, index) => (
                    <li key={index} className="option" onClick={() => handleSelect(item)}>
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}
