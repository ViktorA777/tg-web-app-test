import React, { useCallback, useEffect, useRef, useState } from "react";
import { getProducts } from "../../api/productService";
import { ProductItem } from "../ProductItem/ProductItem";
import { useQuery } from "@tanstack/react-query";
import styles from "./product.module.scss";
import { IProductItem } from "../../types/types";
import { useTelegram } from "../../hooks/useTelegram";
import { getTotalPrice } from "../../utils/utils";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { FilterTabs } from "../FilterTabs/FilterTabs";
import { debounce } from "lodash";

const sections = [
  { id: "beef", label: "говядина" },
  { id: "chicken", label: "курица" },
  { id: "snacks", label: "снэки" },
  { id: "drinks", label: "напитки" },
];

export const ProductList: React.FC = () => {
  const [addedProducts, setAddedProducts] = useState<IProductItem[]>([]);
  const [currentCategory, setCurrentCategory] = useState("beef");

  console.log("addedProducts", addedProducts);

  const { tg } = useTelegram();

  const sectionRefs = useRef<any>({});

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useEffect(() => {
    const handleIntersect = debounce((entries) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setCurrentCategory(entry.target.id);
        }
      });
    }, 150);

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.7,
    });

    sections.forEach((section) => {
      if (sectionRefs.current[section.id]) {
        observer.observe(sectionRefs.current[section.id]);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (sectionRefs.current[section.id]) {
          observer.unobserve(sectionRefs.current[section.id]);
        }
      });
    };
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentCategory(newValue);
    const section = sectionRefs.current[newValue];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  //   const onSendData = useCallback(() => {
  //     const dataForSend = {
  //       products: addedProducts,
  //       totalPrice: getTotalPrice(addedProducts),
  //       queryId
  //     };
  //     axios.post("http://localhost:5173", JSON.stringify(dataForSend), {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   }, []);

  //  useEffect(() => {
  //    tg.onEvent("mainButtonClicked", onSendData);

  //    return () => {
  //      tg.offEvent("mainButtonClicked", onSendData);
  //    };
  //  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.onClick(() => {
      tg.showAlert(
        `Покупка успешна! Общая сумма: ${getTotalPrice(addedProducts)} рублей.`,
        () => {
          setAddedProducts([]);
          tg.MainButton.hide();
        }
      );
    });

    return () => {
      tg.MainButton.offClick;
    };
  }, [tg.MainButton, addedProducts]);

  const onAdd = (product: IProductItem) => {
    const alreadyAdded = addedProducts.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedProducts.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedProducts, product];
    }

    setAddedProducts(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <>
      <div className={styles.filter}>
        <FilterTabs
          categories={sections}
          value={currentCategory}
          onChange={handleTabChange}
        />
      </div>
      {isLoading ? (
        <div className={styles.spinner}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.list}>
          {sections.map((category) => (
            <div
              key={category.id}
              id={category.id}
              className={styles.category}
              ref={(el) => (sectionRefs.current[category.id] = el)}
            >
              <span className={styles.span}>{category.label}</span>
              <ul className={styles.list}>
                {data
                  ?.filter((item) => item.category === category.label)
                  .map((product) => (
                    <ProductItem
                      key={product.id}
                      imageUrl={product.imageUrl}
                      title={product.title}
                      price={product.price}
                      onAdd={() => onAdd(product)}
                    />
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
