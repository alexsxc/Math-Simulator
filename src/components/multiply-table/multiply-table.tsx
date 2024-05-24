import React from "react";
import './multiply-table.css';

interface IMultiplyTableProps {
  isOpen: boolean,
}

export function MultiplyTable({isOpen}: IMultiplyTableProps) {
  return (
    <div className={`multiply-table ${isOpen ? "multiply-table--open" : ""}`}>
      <div className="multiply-table__wrapper">
        <div className="multiply-table__column multiply-table__column--one">
          <div className="multiply-table__row">1 * 1 = 1</div>
          <div className="multiply-table__row">1 * 2 = 2</div>
          <div className="multiply-table__row">1 * 3 = 3</div>
          <div className="multiply-table__row">1 * 4 = 4</div>
          <div className="multiply-table__row">1 * 5 = 5</div>
          <div className="multiply-table__row">1 * 6 = 6</div>
          <div className="multiply-table__row">1 * 7 = 7</div>
          <div className="multiply-table__row">1 * 8 = 8</div>
          <div className="multiply-table__row">1 * 9 = 9</div>
          <div className="multiply-table__row">1 * 10 = 10</div>
        </div>
        <div className="multiply-table__column multiply-table__column--two">
          <div className="multiply-table__row">2 * 1 = 2</div>
          <div className="multiply-table__row">2 * 2 = 4</div>
          <div className="multiply-table__row">2 * 3 = 6</div>
          <div className="multiply-table__row">2 * 4 = 8</div>
          <div className="multiply-table__row">2 * 5 = 10</div>
          <div className="multiply-table__row">2 * 6 = 12</div>
          <div className="multiply-table__row">2 * 7 = 14</div>
          <div className="multiply-table__row">2 * 8 = 16</div>
          <div className="multiply-table__row">2 * 9 = 18</div>
          <div className="multiply-table__row">2 * 10 = 20</div>
        </div>
        <div className="multiply-table__column multiply-table__column--three">
          <div className="multiply-table__row">3 * 1 = 3</div>
          <div className="multiply-table__row">3 * 2 = 6</div>
          <div className="multiply-table__row">3 * 3 = 9</div>
          <div className="multiply-table__row">3 * 4 = 12</div>
          <div className="multiply-table__row">3 * 5 = 15</div>
          <div className="multiply-table__row">3 * 6 = 18</div>
          <div className="multiply-table__row">3 * 7 = 21</div>
          <div className="multiply-table__row">3 * 8 = 24</div>
          <div className="multiply-table__row">3 * 9 = 27</div>
          <div className="multiply-table__row">3 * 10 = 30</div>
        </div>
        <div className="multiply-table__column multiply-table__column--four">
          <div className="multiply-table__row">4 * 1 = 4</div>
          <div className="multiply-table__row">4 * 2 = 8</div>
          <div className="multiply-table__row">4 * 3 = 12</div>
          <div className="multiply-table__row">4 * 4 = 16</div>
          <div className="multiply-table__row">4 * 5 = 20</div>
          <div className="multiply-table__row">4 * 6 = 24</div>
          <div className="multiply-table__row">4 * 7 = 28</div>
          <div className="multiply-table__row">4 * 8 = 32</div>
          <div className="multiply-table__row">4 * 9 = 36</div>
          <div className="multiply-table__row">4 * 10 = 40</div>
        </div>
        <div className="multiply-table__column multiply-table__column--five">
          <div className="multiply-table__row">5 * 1 = 5</div>
          <div className="multiply-table__row">5 * 2 = 10</div>
          <div className="multiply-table__row">5 * 3 = 15</div>
          <div className="multiply-table__row">5 * 4 = 20</div>
          <div className="multiply-table__row">5 * 5 = 25</div>
          <div className="multiply-table__row">5 * 6 = 30</div>
          <div className="multiply-table__row">5 * 7 = 35</div>
          <div className="multiply-table__row">5 * 8 = 40</div>
          <div className="multiply-table__row">5 * 9 = 45</div>
          <div className="multiply-table__row">5 * 10 = 50</div>
        </div>
        <div className="multiply-table__column multiply-table__column--six">
          <div className="multiply-table__row">6 * 1 = 6</div>
          <div className="multiply-table__row">6 * 2 = 12</div>
          <div className="multiply-table__row">6 * 3 = 18</div>
          <div className="multiply-table__row">6 * 4 = 24</div>
          <div className="multiply-table__row">6 * 5 = 30</div>
          <div className="multiply-table__row">6 * 6 = 36</div>
          <div className="multiply-table__row">6 * 7 = 42</div>
          <div className="multiply-table__row">6 * 8 = 48</div>
          <div className="multiply-table__row">6 * 9 = 54</div>
          <div className="multiply-table__row">6 * 10 = 60</div>
        </div>
        <div className="multiply-table__column multiply-table__column--seven">
          <div className="multiply-table__row">7 * 1 = 7</div>
          <div className="multiply-table__row">7 * 2 = 14</div>
          <div className="multiply-table__row">7 * 3 = 21</div>
          <div className="multiply-table__row">7 * 4 = 28</div>
          <div className="multiply-table__row">7 * 5 = 35</div>
          <div className="multiply-table__row">7 * 6 = 42</div>
          <div className="multiply-table__row">7 * 7 = 49</div>
          <div className="multiply-table__row">7 * 8 = 56</div>
          <div className="multiply-table__row">7 * 9 = 63</div>
          <div className="multiply-table__row">7 * 10 = 70</div>
        </div>
        <div className="multiply-table__column multiply-table__column--eight">
          <div className="multiply-table__row">8 * 1 = 8</div>
          <div className="multiply-table__row">8 * 2 = 16</div>
          <div className="multiply-table__row">8 * 3 = 24</div>
          <div className="multiply-table__row">8 * 4 = 32</div>
          <div className="multiply-table__row">8 * 5 = 40</div>
          <div className="multiply-table__row">8 * 6 = 48</div>
          <div className="multiply-table__row">8 * 7 = 56</div>
          <div className="multiply-table__row">8 * 8 = 64</div>
          <div className="multiply-table__row">8 * 9 = 72</div>
          <div className="multiply-table__row">8 * 10 = 80</div>
        </div>
        <div className="multiply-table__column multiply-table__column--nine">
          <div className="multiply-table__row">9 * 1 = 9</div>
          <div className="multiply-table__row">9 * 2 = 18</div>
          <div className="multiply-table__row">9 * 3 = 27</div>
          <div className="multiply-table__row">9 * 4 = 36</div>
          <div className="multiply-table__row">9 * 5 = 45</div>
          <div className="multiply-table__row">9 * 6 = 54</div>
          <div className="multiply-table__row">9 * 7 = 63</div>
          <div className="multiply-table__row">9 * 8 = 72</div>
          <div className="multiply-table__row">9 * 9 = 81</div>
          <div className="multiply-table__row">9 * 10 = 90</div>
        </div>
        <div className="multiply-table__column multiply-table__column--ten">
          <div className="multiply-table__row">10 * 1 = 10</div>
          <div className="multiply-table__row">10 * 2 = 20</div>
          <div className="multiply-table__row">10 * 3 = 30</div>
          <div className="multiply-table__row">10 * 4 = 40</div>
          <div className="multiply-table__row">10 * 5 = 50</div>
          <div className="multiply-table__row">10 * 6 = 60</div>
          <div className="multiply-table__row">10 * 7 = 70</div>
          <div className="multiply-table__row">10 * 8 = 80</div>
          <div className="multiply-table__row">10 * 9 = 90</div>
          <div className="multiply-table__row">10 * 10 = 100</div>
        </div>        
      </div>
    </div>
  )
}