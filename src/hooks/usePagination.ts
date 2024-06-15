import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { unionBy } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Message } from "../types";
import { getLastItem } from "../util";
import { dbMessageRef } from "../util/firebase";

const FETCH_LIMIT = 20;

export const usePagination = (): [ReadonlyArray<Message>, boolean, () => void, boolean] => {
  const [data, setData] = useState<Array<Message>>([]);
  const [fireStoreLoading, setFireStoreLoading] = useState(false);
  const [lastItem, setLastItem] = useState<QueryDocumentSnapshot<Message, DocumentData> | null>(null);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const q = query(dbMessageRef, orderBy("createdAt", "desc"), limit(FETCH_LIMIT));
  const [snapshot, loading] = useCollection(q);

  const getSnapshotValue = (s?: QuerySnapshot<Message> | null) => s?.docs.map((d) => ({ ...d.data(), id: d.id })) ?? [];

  useEffect(() => {
    const v = getSnapshotValue(snapshot);
    setHasMoreItems(v.length >= FETCH_LIMIT);
    setData((data) => unionBy(v, data, "id"));
    setLastItem(getLastItem(snapshot?.docs) ?? null);
  }, [snapshot]);

  useEffect(() => {
    setFireStoreLoading(loading);
  }, [loading]);

  const more = useCallback(() => {
    setFireStoreLoading(true);
    const qq = query(dbMessageRef, orderBy("createdAt", "desc"), startAfter(lastItem), limit(FETCH_LIMIT));
    getDocs(qq)
      .then((d) => {
        const v = getSnapshotValue(d);
        setHasMoreItems(v.length >= FETCH_LIMIT);
        setData((data) => unionBy(data, v, "id"));
        setLastItem(getLastItem(d.docs) ?? null);
      })
      .finally(() => {
        setFireStoreLoading(false);
      });
  }, [lastItem, setFireStoreLoading]);

  return [data, fireStoreLoading, more, hasMoreItems];
};
